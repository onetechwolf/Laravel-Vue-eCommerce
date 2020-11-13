import {Form} from 'vform';

export default {
    CREATE_PRODUCT(state,product){
        state.products.unshift(product)
    },
    DELETE_PRODUCT(state,product){
        let index= state.products.findIndex(item => item.id === product.id);
        state.products.splice(index , 1)
    },
    VIEW_DATA(state, payload){
        state.viewProductData =  payload
    },
    GET_EDIT_DATA(state , payload){
        if(state.editProductMeta.modal){
            state.editProductMeta.showModal = !state.editProductMeta.showModal
        }
        payload.brand_id = payload.brand.id
        let defaultData = {
            id: '',
            brand_id:'',
            name: "",
            slug:"",
            sku:"",
            price: "",
            categories: null,
            quantity:"",
            image:"",
            featured: false,
            status: true ,
            description: ""
        }
        for (const key in defaultData) {
            if (payload.hasOwnProperty(key)) {
                defaultData[key] = payload[key]
            }
        }
        state.editProductData =  new Form(defaultData)
    },
    UPDATE_PRODUCT(state , response){
        let index = state.products.findIndex(item => item.id == response.id);
        for( let key in product){
            if (state.products[index].hasOwnProperty(key)) {
                state.products[index][key] = product[key];
            }
        }
    },
    DELETE_MULTI_PRODUCT(state,selectedProducts){
        state.products = state.products.filter( objectA => {
            return !selectedProducts.find(objectB => objectA.id === objectB.id)
        })
        state.multiSelected = [];
    },
    FETCH_PRODUCTS(state , products){
        state.products = products
    },

    FILTER_DATA(state , payload){
        // state.filterString = payload
        for(let obj in payload){
            state.filterString[obj] = payload[obj]
        }
    },
    TOGGLE_MODAL(state, addModal = 'add'){
        if (addModal == "add") {
            state.addProductMeta.showModal = !state.addProductMeta.showModal
        } else {
            state.editProductMeta.showModal = !state.editProductMeta.showModal
        }
    } ,
    HANDLE_VIEW(state, addHandleView = true){
        if (addHandleView) {
            state.addProductMeta.isImageVisible = !state.addProductMeta.isImageVisible
        } else {
            state.editProductMeta.isImageVisible = !state.editProductMeta.isImageVisible
        }
    }
}
