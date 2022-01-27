import { useForm } from '../hooks/useForm';

export const ContactFilter = ({ onChangeFilter }) => {
  const [setFilterBy, handleChange] = useForm(
    {
      filterBy: '',
    },
    onChangeFilter
  );

  const { filterBy } = setFilterBy;

  return (
    <form className="contact-filter  ">
      <section className="input-container">
        <input
          onChange={handleChange}
          value={filterBy}
          type="text"
          name="filterBy"
          id="filterBy"
          placeholder="Search"
          title="Search by Name, Phone or Email"
        />
      </section>
    </form>
  );
};
