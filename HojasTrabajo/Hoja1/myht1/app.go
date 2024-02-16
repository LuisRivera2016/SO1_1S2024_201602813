package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os/exec"
)

// App struct
type App struct {
	ctx context.Context
}

type Ram struct {
	TotalRam     uint64 `json:"totalRAM"`
	MemoriaEnUso uint64 `json:"memoriaEnUso"`
	Porcentaje   uint64 `json:"porcentaje"`
	Libre        uint64 `json:"libre"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetRamURL() Ram {

	var ram Ram

	// interval := 0.5 // segundos
	// ticker := time.NewTicker(time.Second * time.Duration(interval))
	// defer ticker.Stop()

	// for {
	// 	select {
	// 	case <-ticker.C:
	// 		fmt.Println("DATOS OBTENIDOS DESDE EL MODULO:")
	// 		fmt.Println("")

	// 		cmd := exec.Command("sh", "-c", "cat /proc/modulo_ram")
	// 		out, err := cmd.CombinedOutput()
	// 		if err != nil {
	// 			fmt.Println(err)
	// 		}
	// 		output := string(out[:])
	// 		fmt.Println(output)
	// 		//

	// 		err = json.Unmarshal([]byte(output), &ram)
	// 		if err != nil {
	// 			fmt.Println("Error unmarshalling JSON:", err)
	// 			return Ram{}
	// 		}

	// 		return ram

	// 	}

	// }

	fmt.Println("DATOS OBTENIDOS DESDE EL MODULO:")
	fmt.Println("")

	cmd := exec.Command("sh", "-c", "cat /proc/modulo_ram")
	out, err := cmd.Output()
	if err != nil {
		fmt.Println(err)
	}
	// output := string(out[:])
	// fmt.Sprintf(output)
	//

	err = json.Unmarshal(out, &ram)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return Ram{}
	}

	// fmt.Sprintf("TOtal RAM", ram.TotalRam)

	return ram

}
