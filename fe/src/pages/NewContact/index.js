import PageHeader from '../../Components/PageHeader';
import ContactForm from '../../Components/ContactForm';

export default function NewContact() {
  return (
    <>
      <PageHeader
        title="Novo contato"
      />
      <ContactForm
        buttonLabel="Cadastrar"
      />
    </>
  );
}
