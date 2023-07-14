import { useSelector } from 'react-redux';
import FilterCategory from '../FilterCategory/FilterCategory';
import { getAllProducts } from '../../../../redux/product/selector';
import RecomCard from '../../../Home/Component/Recomendation/RecomCard';
import css from './Pagination.module.css';

const Pagination = () => {
  const product = useSelector(getAllProducts);

  return (
    <div className={css.container}>
      <div className={css.buttonFilter}>
        <FilterCategory />
      </div>
      <ul className={css.list}>
        {product &&
          product
            .slice(0, 9)
            .map(({ itemId, description, name, price, category, image }) => {
              return (
                <RecomCard
                  key={itemId}
                  description={description}
                  name={name}
                  price={price}
                  margin={css.margin}
                  category={category}
                  itemId={itemId}
                  image={image}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Pagination;
