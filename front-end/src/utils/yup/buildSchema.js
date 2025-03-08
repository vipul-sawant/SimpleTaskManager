import * as Yup from 'yup';

const buildSchema = (fieldsArray, page) => {

    console.log('page :', page);
    
    const shapeSchema = fieldsArray.reduce((shape, field)=>{
        
            shape[field.name] = field.validation;
            return shape;
    }, {});

    return Yup.object().shape(shapeSchema);
};

export default buildSchema;