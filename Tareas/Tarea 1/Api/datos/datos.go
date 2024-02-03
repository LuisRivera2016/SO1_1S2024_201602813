package datos

// Represents a recipe
type Datos struct {
	Name  string `json:"name"`
	Carne int    `json:"carne"`
}

// Represents individual ingredients
type Ingredient struct {
	Name string `json:"name"`
}
