import styles from './SideBar.module.css';

const SideBar = ({header, children}) => {
    return (
        <div className={"d-flex flex-column flex-shrink-0 p-3 bg-light " + styles.sidebar} >
            <a href="/" className="d-flex align-items-center mb-3 me-md-auto link-dark text-decoration-none">
            <svg className="bi pe-none me-2" width="40" height="32"></svg>
            <span className="fs-5">{header}</span>
            </a>
            {children}
        </div>
    )
};

export default SideBar;