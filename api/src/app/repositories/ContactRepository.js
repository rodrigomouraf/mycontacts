const db = require('../../database');

/* const contacts = [
  {
    // id: uuid(),
    name: 'Rodrigo Moura',
    email: 'rodrigomoura_rm@hotmail.com',
    phone: '9999999',
    // category_id: uuid(),
  },
  {
    // id: uuid(),
    name: 'Stéphane Caroline',
    email: 'stephane_@hotmail.com',
    phone: '999999999',
    // category_id: uuid(),
  },
]; */

class ContactRepository{
  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      select con.id, con.name, con.email, con.phone, cat.name as name_categoria
      from contacts con
      left join categories cat on (con.category_id = cat.id)
      order by name ${direction}
    `);

    return rows;
    // return new Promise((resolve) => resolve(contacts));
  }

  async findById(id){
    const [row] = await db.query(`
    select con.id, con.name, con.email, con.phone, cat.name as name_categoria
    from contacts con
    left join categories cat on (con.category_id = cat.id)
      WHERE con.id = $1
    `, [id]);

    return row;
    /* return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    )); */
  }

  async findByEmail(email){
    const [row] = await db.query(`
    SELECT *
    FROM contacts
    WHERE email = $1
  `, [email]);

    return row;
  /* return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    )); */
  }

  async create({
    name, email, phone, category_id,
  }){
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);

    return row;

    /* return new Promise((resolve) => {
      const newContact = {
        id: uuid(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact); */
  }

  async delete(id){
    const deleteOp = db.query(`
      DELETE FROM contacts
      WHERE id = $1
    `, [id]);
    return deleteOp;
    /* return new Promise((resolve) => {
       contacts = contacts.filter((contact) => contact.id !== id);
       resolve();
     }); */
  }

  async update(id, {
    name, email, phone, category_id,
  }){
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
    /* return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    }); */
  }
}

module.exports = new ContactRepository();
