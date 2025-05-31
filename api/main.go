package main

import (
	"log"
	"net/http"
)

func main() {
	// Initialize database
	if err := InitDatabase(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer CloseDatabase()

	// Setup router
	router := Router()

	// Start server
	port := GetEnv("PORT", "8080")
	log.Printf("⚡️Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
