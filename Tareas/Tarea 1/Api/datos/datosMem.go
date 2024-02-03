package datos

import "errors"

var (
	NotFoundErr = errors.New("not found")
)

type MemStore struct {
	list map[string]Datos
}

func NewMemStore() *MemStore {
	list := make(map[string]Datos)
	return &MemStore{
		list,
	}
}

func (m MemStore) Add(name string, recipe Datos) error {
	m.list[name] = recipe
	return nil
}

// func (m MemStore) Get(name string) (Datos, error) {

// 	if val, ok := m.list[name]; ok {
// 		return val, nil
// 	}

// 	return Datos{}, NotFoundErr
// }

func (m MemStore) List() (map[string]Datos, error) {
	return m.list, nil
}

// func (m MemStore) Update(name string, recipe Datos) error {

// 	if _, ok := m.list[name]; ok {
// 		m.list[name] = recipe
// 		return nil
// 	}

// 	return NotFoundErr
// }

// func (m MemStore) Remove(name string) error {
// 	delete(m.list, name)
// 	return nil
// }
