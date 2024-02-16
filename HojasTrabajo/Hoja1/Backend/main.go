package main

import (
	"fmt"
	"os/exec"
	"time"
)

func main() {
	// Lanzar un goroutine que ejecute la función cada n segundos
	interval := 3 // segundos
	ticker := time.NewTicker(time.Second * time.Duration(interval))
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			fmt.Println("DATOS OBTENIDOS DESDE EL MODULO:")
			fmt.Println("")

			cmd := exec.Command("sh", "-c", "cat /proc/modulo_ram")
			out, err := cmd.CombinedOutput()
			if err != nil {
				fmt.Println(err)
			}
			output := string(out[:])
			fmt.Println(output)
		}
	}
}
