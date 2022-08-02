
const SideBar = () => {
    return (
        <div className="sidebar" hidden>
            <h3>Available Time</h3>
            <ul className="list-groupd">
                <li className="list-group-item active" aria-current="true">00:00</li>
                <li className="list-group-item">00:00</li>
                <li className="list-group-item">00:00</li>
                <li className="list-group-item">00:00</li>
                <li className="list-group-item">00:00</li>
            </ul>
        </div>
    )
};

export default SideBar;