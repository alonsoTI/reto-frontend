const apiUrlAuth = 'http://localhost:5000/api/auth';
const apiUrl = 'http://localhost:5000/api/register';

function consultaRuc() {
    const authHeaders = {
        'Content-Type': 'application/json',
    };
    const ruc = document.getElementById('ruc').value;
    const tipo = document.getElementById('tipo').value;
    const data = {
        ruc: ruc,
        tipo: tipo
    };
    axios.post(apiUrlAuth, { headers: authHeaders })
        .then(response => {
            const jwtToken = response.data.token;
            const headers = {
                'Authorization': jwtToken,
                'Content-Type': 'application/json'
            };
            axios.post(apiUrl, data, { headers })
                .then(apiResponse => {
                    console.log('Respuesta de la API:', apiResponse.data);
                    var fila = "<tr>"+
                            "<td>"+apiResponse.data.ruc+"</td>"+
                            "<td>"+apiResponse.data.razon_social+"</td>"+
                            "<td>"+apiResponse.data.estado+"</td>"+
                            "<td>"+apiResponse.data.direccion+"</td>"+
                            "<td>"+apiResponse.data.distrito+"</td>"+
                            "<td>"+apiResponse.data.departamento+"</td>"+
                            "<td>"+apiResponse.data.provincia+"</td>"+
                            "<td>"+apiResponse.data.ubigeo+"</td>"+
                        "</tr>"
            
            document.getElementById("tabla").insertRow(-1).innerHTML = fila;
                })
                .catch(apiError => {
                    console.error('Error al hacer la solicitud a la API:', apiError.message);

                });
        })
        .catch(error => {
            console.error('Error al obtener el token:', error.message);
        });
}