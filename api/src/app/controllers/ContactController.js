const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response){
    // Listar todos os registros
    const { orderBy } = request.query;
    response.json(await ContactRepository.findAll(orderBy));
  }

  async show(request, response){
    // Obter UM registro
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact){
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  async store(request, response){
    // Criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name){
      return response.status(404).json({ error: 'name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists){
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async update(request, response){
    // Editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExist = ContactRepository.findById(id);

    if (!contactExist){
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name){
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id){
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response){
    // Deletar um registro
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact){
      return response.status(404).json({ error: 'User not found' });
    }

    await ContactRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
