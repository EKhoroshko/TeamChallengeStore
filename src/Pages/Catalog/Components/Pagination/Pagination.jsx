import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getIsLoadingProduct,
  getAllProducts,
} from '../../../../redux/product/selector';
import {
  getSortetedCategory,
  getAll,
} from '../../../../redux/product/operation';
import FilterCategory from '../FilterCategory/FilterCategory';
import Spinner from '../../../../Components/Spinner/Spinner';
import RecomCard from '../../../Home/Component/Recomendation/RecomCard';
import Paginate from './Paginate';
import css from './Pagination.module.css';

// eslint-disable-next-line react/prop-types
const Pagination = ({ products = [] }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoadingProduct);
  const { totalPages, currentPage } = useSelector(getAllProducts);
  const [current, setCurrent] = useState(currentPage || 1);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrent(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrent(currentPage + 1);
    }
  };

  const paginate = pageNumber => {
    setCurrent(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (params.id !== undefined) {
        await dispatch(
          getSortetedCategory({ category: params.id, page: current }),
        );
      } else {
        await dispatch(getAll(current));
      }
    };

    fetchData();
  }, [current, dispatch, params.id]);

  const load = isLoading ? (
    <Spinner />
  ) : (
    <>
      {products &&
        products.map(
          ({
            itemId,
            description,
            name,
            price,
            category,
            image,
            subcategory,
          }) => {
            return (
              <RecomCard
                key={itemId}
                description={description}
                name={name}
                price={price}
                category={category}
                itemId={itemId}
                subcategory={subcategory}
                image={image}
                margin={css.margin}
              />
            );
          },
        )}
    </>
  );

  return (
    <div className={css.container}>
      <div className={css.buttonFilter}>
        <FilterCategory />
      </div>
      <ul className={css.list}>
        {products.length === 0 ? <div>The products is out of stock</div> : load}
      </ul>
      <Paginate
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Pagination;
