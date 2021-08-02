import { createEntry } from '../api/data.js';
import { html } from '../../node_modules/lit-html/lit-html.js'
// import { styleMap } from '../../node_modules/lit-html/directives/style-map.js'

const createTemplate = (valid, onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${valid.make ? 'is-valid' : 'is-invalid'}" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${valid.model ? 'is-valid' : 'is-invalid'}" id="new-model" type="text"
                    name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${valid.year ? 'is-valid' : 'is-invalid'}" id="new-year" type="number"
                    name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${valid.description ? 'is-valid' : 'is-invalid'}" id="new-description"
                    type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${valid.price ? 'is-valid' : 'is-invalid'}" id="new-price" type="number"
                    name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${valid.img ? 'is-valid' : 'is-invalid'}" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export default async function createView(context) {

    const valid = {
        make: true,
        model: true,
        year: true,
        description: true,
        price: true,
        img: true,
    }

    context.render(createTemplate(valid, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entry = {
            make: formData.get('make'),
            model: formData.get('model'),
            year: formData.get('year'),
            description: formData.get('description'),
            price: formData.get('price'),
            img: formData.get('img'),
            material: formData.get('material')
        }
        if (entry.make.length < 4) {
            valid.make = false;
        } else {
            valid.make = true;
        }
        if (entry.model.length < 4) {
            valid.model = false;
        } else {
            valid.model = true;
        }
        if (Number(entry.year) < 1950 || Number(entry.year) > 2050) {
            valid.year = false;
        } else {
            valid.year = true;
        }
        if (entry.description.length <= 10) {
            valid.description = false;
        } else {
            valid.description = true;
        }
        if (Number(entry.price) <= 0) {
            valid.price = false;
        } else {
            valid.price = true;
        }
        if (entry.img == '') {
            valid.img = false;
        } else {
            valid.img = true;
        }

        context.render(createTemplate(valid, onSubmit));
        const invalidInput = Object.values(valid).filter(v =>v== false);
        if (invalidInput.length > 0) {
            context.render(createTemplate(valid, onSubmit));
            return;
        }
        
        await createEntry(entry);
        event.target.reset();
        context.page.redirect('/dashboard');
    }
}