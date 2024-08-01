const TableDoctor = (props) => {
    const { doctorList } = props;
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        {/* <th width="257px">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {doctorList &&
                        doctorList.length > 0 &&
                        doctorList.map((item, index) => {
                            return (
                                <tr key={`table-user${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.Account.email}</td>
                                    <td>{item.phone}</td>
                                    {/* <td>
                                        <button className="btn btn-success">View</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            );
                        })}
                    {doctorList && doctorList.length === 0 && (
                        <tr>
                            <td colSpan={"5"}>Không có bác sĩ nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default TableDoctor;
