package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type ResponseData struct {
	Nombre string `json:"nombre"`
	Carne  int    `json:"carne"`
}

func main() {
	app := fiber.New()

	// Enable CORS with default options
	app.Use(cors.New())

	// Define your routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, CORS!")
	})

	// Define your routes
	app.Get("/data", func(c *fiber.Ctx) error {
		// Create a response object
		response := ResponseData{
			Nombre: "Luis RIvera",
			Carne:  201602813,
		}

		// Send the response as JSON
		return c.JSON(response)
	})
	// Start the server on port 3000
	err := app.Listen(":3000")
	if err != nil {
		panic(err)
	}
}
