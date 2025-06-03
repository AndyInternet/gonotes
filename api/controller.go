package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/AndyInternet/gonotes/models"
	"github.com/go-chi/chi/v5"
	_ "github.com/lib/pq"
	"github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

func Index(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	response := map[string]any{
		"message": "It's Go Time!",
	}

	json.NewEncoder(w).Encode(response)
}

func GetNotes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	notes, err := models.Notes(
		qm.Select("id", "created_at", "updated_at", "title"),
		qm.OrderBy("updated_at DESC"),
	).All(context.Background(), DB)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(notes)
}

func CreateNote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	validatedData, ok := r.Context().Value(ValidatedDataKey).(NoteDTO)
	if !ok {
		var note models.Note
		if err := json.NewDecoder(r.Body).Decode(&note); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
	} else {
		note := &models.Note{
			Title: validatedData.Title,
			Body:  null.JSONFrom(validatedData.Body),
		}

		if err := note.Insert(context.Background(), DB, boil.Infer()); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(note)
		return
	}
}

func GetNoteByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "ID required", http.StatusBadRequest)
		return
	}

	note, err := models.Notes(qm.Where("id = ?", id)).One(context.Background(), DB)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Note not found", http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(note)
}

func UpdateNote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "ID required", http.StatusBadRequest)
		return
	}

	note, err := models.Notes(qm.Where("id = ?", id)).One(context.Background(), DB)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Note not found", http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	validatedData, ok := r.Context().Value(ValidatedDataKey).(NoteDTO)
	if !ok {
		var updateReq NoteDTO
		if err := json.NewDecoder(r.Body).Decode(&updateReq); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		validatedData = updateReq
	}

	note.Title = validatedData.Title
	if len(validatedData.Body) > 0 {
		note.Body = null.JSONFrom(validatedData.Body)
	}

	_, err = note.Update(context.Background(), DB, boil.Infer())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(note)
}

func DeleteNote(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "ID required", http.StatusBadRequest)
		return
	}

	note, err := models.Notes(qm.Where("id = ?", id)).One(context.Background(), DB)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Note not found", http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = note.Delete(context.Background(), DB)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
