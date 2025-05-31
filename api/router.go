package main

import (
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
)

func Router() *chi.Mux {
	router := chi.NewRouter()

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
