const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response){
    response.json(await CategoriesRepository.findAll());
  }

  async store(request, response){
    const { name } = request.body;

    if (!name){
      return response.status(400).json({ error: 'name is required' });
    }

    const row = await CategoriesRepository.create(name);

    response.json(row);
  }

  async show(request, response){
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category){
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(category);
  }

  async update(request, response){
    const { id } = request.params;
    const { name } = request.body;

    if (!name){
      return response.status(400).json({ error: 'name is required' });
    }

    const contactExist = await CategoriesRepository.findById(id);

    if (!contactExist){
      return response.status(404).json({ error: 'User not found' });
    }

    const category = await CategoriesRepository.update(id, { name });

    response.json(category);
  }

  async delete(request, response){
    const { id } = request.params;

    const contact = await CategoriesRepository.findById(id);
    if (!contact){
      return response.status(404).json({ error: 'Contact not found' });
    }

    await CategoriesRepository.delete(id);

    response.status(204);
  }
}

module.exports = new CategoryController();
