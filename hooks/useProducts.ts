import { Service } from '@/constants/Service';

const useProducts = () => {

    const getProducts = () => {

        return fetch(Service.servicesUrl,
            {
                method: 'GET',
                headers: {
                    'authorId': '1853658962',
                    'Access-Control-Allow-Origin': "*",
                }
            }
        )
            .then(response => response.json())
            .then(json => {
                return json;
            })
            .catch(error => {
                console.error(error);
            });
    };

    const uploadProduct = (datos: Object) => {
        return fetch(Service.servicesUrl,
            {
                method: 'POST',
                headers: {
                    'authorId': '1853658962',
                    "Content-Type": "application/json; charset=utf8"
                },
                body: JSON.stringify(datos)
            }
        )
            .then(response => response.json())
            .then(json => {
                return json;
            })
            .catch(error => {
                console.error(error);
            });
    };

    const updateProduct = (datos: Object) => {
        return fetch(Service.servicesUrl,
            {
                method: 'PUT',
                headers: {
                    'authorId': '1853658962',
                    "Content-Type": "application/json; charset=utf8"
                },
                body: JSON.stringify(datos)
            }
        )
            .then(response => response.json())
            .then(json => {
                return json;
            })
            .catch(error => {
                console.error(error);
            });
    };

    const deleteProduct = (param: string) => {
        return fetch(Service.servicesUrl+`?id=${param}`,
            {
                method: 'DELETE',
                headers: {
                    'authorId': '1853658962',
                },
            }
        )
            .then(response => response.json())
            .then(json => {
                return json;
            })
            .catch(error => {
                console.error(error);
            });
    };

    const verificarProduct = (param: string) => {
        return fetch(Service.servicesUrl+`/verification?id=${param}`,
            {
                method: 'GET',
                headers: {
                    'authorId': '1853658962',
                },
            }
        )
            .then(response => response.json())
            .then(json => {
                return json;
            })
            .catch(error => {
                console.error(error);
            });
    };

    return {getProducts, uploadProduct, updateProduct, deleteProduct, verificarProduct}
}

export default useProducts