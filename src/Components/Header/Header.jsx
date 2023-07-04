import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../enum/app-route.js';
import { toastAction } from '../../enum/toastAction.js';
import { getUser } from '../../redux/user/selectors.js';
import { toast } from 'react-toastify';
import Input from '../Input/Input.jsx';
import Call from '../../assets/call.svg';
import Basket from '../../assets/basket.svg';
import Favorite from '../../assets/favorite.svg';
import Person from '../../assets/person.svg';
import Logo from '../../assets/logo.png';
import css from './Header.module.css';

const Header = () => {
  const [qwery, setQwery] = useState('');
  const { username, token } = useSelector(getUser);

  useEffect(() => {
    if (username) {
      toast.success(`Welcome ${username}`, toastAction);
    }
  }, [username]);

  const handleChangeQwerty = e => {
    setQwery(e.target.value);
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div className={css.navBox}>
          <ul className={css.boxList}>
            <li>
              <NavLink className={css.link} to={AppRoute.DISCOUNT}>
                Promotions and discounts
              </NavLink>
            </li>
            <li className={css.listItem}>
              <NavLink className={css.link} to={AppRoute.DELIVERY}>
                Delivery
              </NavLink>
            </li>
          </ul>
          <a className={css.link} href="tel:+380500000000">
            <img className={css.img} src={Call} alt="phone" />
            +38 (050) 000 00 00
          </a>
        </div>

        <ul className={css.navBox2}>
          <li>
            <img src={Logo} alt="logo" />
          </li>
          <li className={css.boxList}>
            <NavLink
              className={css.link + ' ' + css.catalog}
              to={AppRoute.CATALOG}
            >
              Каталог
            </NavLink>
            <Input
              className={css.input}
              type="text"
              name="text"
              value={qwery}
              onChange={handleChangeQwerty}
            />
          </li>
          <li className={css.boxCall}>
            <div className={css.boxCall}>
              {token ? (
                <NavLink to={AppRoute.PROFILE} className={css.link}>
                  <img src={Person} alt="profile" />
                  {username}
                </NavLink>
              ) : (
                <NavLink className={css.link} to={AppRoute.LOGIN}>
                  <img src={Person} alt="profile" />
                  Sign In
                </NavLink>
              )}
            </div>
            <button className={css.button}>
              <img src={Favorite} alt="heart" />
            </button>
            <NavLink className={css.link} to={AppRoute.BASKET}>
              <img src={Basket} alt="basket" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
