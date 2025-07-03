// Modulo 3 - Semana 3
console.log("Bienvenido a mi prueba de Modulo 3 - Semana 3");
console.log("Temas abordados esta semana: APIs, async/await, try then catch, CRUD, fetch, node.js y JSON.");
console.log("");

// ---------- API -----------
const apiBaseUrl = "http://localhost:3000/fruits"; // API local de db.json.


// ---------- GET ----------
async function getFruits() { // Uso async y await para más adelante llamar a la accion que quiera hacer.
    try {
        console.log("Obteniendo las frutas...");
        const response = await fetch(apiBaseUrl); // Petición al servidor.
        // Los awaits tienen como proposito pausar la ejecución de la función async hasta que una Promesa se resuelva o se rechace.
        if (!response.ok) { 
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        } // response.status: Esta propiedad devuelve el código de estado numérico HTTP de la respuesta.
        // response.statusText: Esta propiedad devuelve el mensaje de estado HTTP asociado al código.

        const data = await response.json(); // response es lo que obtenemos del servidor en formato json
        console.log("Frutas", data);
        return data;
    } catch (error) {
        console.error("Ocurrio un error al recibir las frutas:", error);
    }
}


// ---------- POST ----------
async function  postFruits(fruit) {
    try {
        console.log(`Agrengando nueva fruta: ${fruit.name}`);
        const response = await fetch(apiBaseUrl, {
            method: "POST",
            headers: {"Content-type":"application/json"},
            // Content-Type: Esta cabecera es crucial y le dice al servidor qué tipo de formato de datos estás enviando en el cuerpo de la petición.
            // "application/json": Este valor específico le informa al servidor que el cuerpo de la petición contiene datos en formato JSON.
            body: JSON.stringify(fruit)
            // JSON.stringify() es un método de JavaScript que toma un objeto o arreglo JavaScript y lo convierte en una cadena de texto en formato JSON.
        });
        if (!response.ok) {
            throw new Error(`Errir HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Nueva fruta agregada:", data);
        return data;
    } catch (error) {
        console.error("Error al agregar una fruta nueva", error);
    }
}


// ---------- PUT ----------
async function putFruit(id, fruitData) {
    try {
        console.log(`Editando fruta con ID: ${id}`);
        const response = await fetch(`${apiBaseUrl}/${id}`, {
            method: "PUT",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(fruitData)
        });
        if (!response.ok) {
            if (response.status === 404) throw new Error("Fruta no encontrada para actualizar.");
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Se edito una fruta:", data);
        return data;
    } catch (error) {
        console.error("Error al actualizar una fruta:", error);
    }
}


// ---------- DELETE ----------
async function deleteFruit(id) {
    try {
        console.log(`Eliminando fruta con ID: ${id}`);
        const response = await fetch(`${apiBaseUrl}/${id}`,{
            method: "DELETE"
        });
        if (!response.ok) {
            if (response.status === 404) throw new Error("Fruta no encontrada para eliminar.");
        }
        console.log(`Fruta con ID ${id} eliminada`);
        return true;
    } catch (error) {
        console.error(`Error al eliminar la fruta:`, error);
    }
}


// ---------- Operaciones CRUD ----------
async function runCrudOperations() {
    // Primero, obtener y mostrar todas las frutas
    await getFruits();

    // Luego, agregar una nueva fruta
    const newFruit = {"id":"6", "name":"Kiwi", "price": 2500, "category":"Frutas"};
    await postFruits(newFruit);

    // Vuelve a obtener las frutas para ver el cambio (el nuevo Kiwi)
    await getFruits();

    // Edita una fruta (la Naranja, que tiene ID "2" en tu db.json original)
    let updateFruit = {"id":"2", "name":"Mandarina", "price": 800, "category":"Frutas"};
    await putFruit(2, updateFruit); 

    // Vuelve a obtener las frutas para ver el cambio (Naranja a Mandarina)
    await getFruits();

    // Elimina una fruta (el Kiwi que acabas de agregar, si tenía ID "6" o el nuevo que le asignó json-server)
    await deleteFruit(6); 

    // Y finalmente, obtener las frutas de nuevo para confirmar la eliminación
    await getFruits();

    // Volver a Naranja:
    updateFruit = {"id":"2", "name":"Naranja", "price": 1500, "category":"Frutas"};
    await putFruit(2, updateFruit);

    // Por último volvemos a mostrar las frutas
    await getFruits();
}


// ---------- Validaciones ----------
function characters(fruit) {
    // Si el nombre no existe O no es un string, o si el precio no es un número
    if (!fruit.name || typeof fruit.name !== "string" || typeof fruit.price !== "number") {
        console.error("Datos de la fruta no válidos: El nombre debe ser un string y el precio un número.");
        return false;
    }
    return true;
    // Si todas las condiciones del if son falsas (es decir, el nombre existe y es string, y el precio es un número), entonces la función devuelve true, indicando que la fruta es "válida" según estos criterios básicos.
}
runCrudOperations();


// ---------- Ejecuciones ----------
// JavaScript: node main.js
// JSON: json-server --watch db.json