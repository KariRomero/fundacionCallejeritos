const validateAdoptionsCreateForm = (form) => {
    const errorsAdoptions = {};

    if (!form.name) errorsAdoptions.name = 'Debe completar el nombre';
    if (!form.age) errorsAdoptions.age = 'Debe completar la edad';
    if (!form.description) errorsAdoptions.description = 'Debe completar la descripción';
    if (!form.imageFiles || form.imageFiles.length === 0) errorsAdoptions.imageFiles = 'Debe seleccionar al menos una imagen';

    return errorsAdoptions;
};

export default validateAdoptionsCreateForm;
