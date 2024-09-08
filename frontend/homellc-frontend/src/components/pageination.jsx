import { useSelector, useDispatch } from "react-redux";
import { clearHomesByUser, setCurrentPage, setHomesByUser } from "../features/homesByUser/homesByUserSlice";
import { useLazyFindHomesByUserQuery } from "../features/api/apiSlice";

function Pagination(){
  const currentPage = useSelector((state) => state.homesByUser.currentPage);
  const totalPages = useSelector((state) => state.homesByUser.totalPages);
  const selectedUser = useSelector((state) => state.userDropdown.selectedUser);
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);
  const dispatch = useDispatch();
  const [getHomesByUser] = useLazyFindHomesByUserQuery();

  const handleChange = async (page) => {
    dispatch(setCurrentPage(page));
    dispatch(clearHomesByUser());
    const homes = await getHomesByUser({ userId: selectedUser.id, page: page }, true).unwrap();
    dispatch(setHomesByUser(homes));
  }
  
  return (
    <div className="flex justify-center items-center space-x-2">
      {pages.map((page) => (
        <button
          onClick={() => handleChange(page)}
          key={page}
          className={`${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-white text-primary"
          } px-4 py-2 rounded-md`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
export default Pagination;