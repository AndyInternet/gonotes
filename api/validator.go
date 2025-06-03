package main

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"

	"github.com/go-playground/validator/v10"
	_ "github.com/lib/pq"
)

type NoteDTO struct {
	Title string          `json:"title" validate:"min=0,max=1024"`
	Body  json.RawMessage `json:"body"`
}

type contextKey string

const ValidatedDataKey contextKey = "validatedData"

var validate = validator.New()

func ValidateNoteJSON(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Could not read request body",
			})
			return
		}

		r.Body = io.NopCloser(bytes.NewBuffer(body))

		var req NoteDTO
		if err := json.Unmarshal(body, &req); err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "Invalid JSON format",
			})
			return
		}

		// Validate that body is valid JSON if provided
		if len(req.Body) > 0 {
			var temp interface{}
			if err := json.Unmarshal(req.Body, &temp); err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusBadRequest)
				json.NewEncoder(w).Encode(map[string]string{
					"error": "Body must be valid JSON",
				})
				return
			}
		}

		if err := validate.Struct(req); err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)

			validationErrors := make(map[string]string)
			for _, err := range err.(validator.ValidationErrors) {
				validationErrors[err.Field()] = getValidationMessage(err)
			}

			json.NewEncoder(w).Encode(map[string]any{
				"error":  "Validation failed",
				"fields": validationErrors,
			})
			return
		}

		ctx := context.WithValue(r.Context(), ValidatedDataKey, req)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}

func getValidationMessage(err validator.FieldError) string {
	switch err.Tag() {
	case "required":
		return "This field is required"
	case "min":
		return "This field is too short"
	case "max":
		return "This field is too long"
	default:
		return "This field is invalid"
	}
}
