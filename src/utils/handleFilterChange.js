export const handleFilterChange = (filters, dispatch, setFilters) => (e) => {
  const { name, value } = e.target;
  const updatedFilters = { ...filters, [name]: value };
  dispatch(setFilters(updatedFilters));
};
