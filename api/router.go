package main

import (
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func Router() *chi.Mux {
	router := chi.NewRouter()

	// CORS configuration
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{GetEnv("API_URL", "http://localhost:3000")},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	router.Get("/", Index)
	router.Get("/notes", GetNotes)
	router.Get("/note/{id}", GetNoteByID)
	router.With(ValidateNoteJSON).Post("/note", CreateNote)
	router.With(ValidateNoteJSON).Put("/note/{id}", UpdateNote)
	router.Delete("/note/{id}", DeleteNote)

	return router
}
