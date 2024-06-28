import "react-pro-sidebar/dist/css/styles.css";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from "react-icons/fa";
import sidebarBg from "../../assets/image/bg2.jpg";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: "24px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: 14,
                            letterSpacing: "1px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <DiReact size={"3em"} color={"00bfff"} />
                        <span>Quản lý</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard />}>
                            dashboard
                            <Link to="/quan-tri-vien" />
                        </MenuItem>
                        <MenuItem icon={<FaGem />}> components</MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu title="Quản lý" icon={<FaRegLaughWink />}>
                            <MenuItem>
                                ManageDoctor
                                <Link to="/admin/quan-ly-bac-si" />
                            </MenuItem>
                            <MenuItem>
                                ManageStaff
                                <Link to="/admin/manage-staff" />
                            </MenuItem>
                            <MenuItem>
                                ManagePatient
                                <Link to="/admin/manage-patient" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    {/* Doctor */}
                    <Menu iconShape="circle">
                        <MenuItem>
                            Quản lý lịch làm viện
                            <Link to="/bac-si/quan-ly-lich-lam-viec" />
                        </MenuItem>
                        <MenuItem>
                            Quản lý khám bệnh
                            <Link to="/bac-si/quan-ly-kham-benh" />
                        </MenuItem>
                        <MenuItem>
                            ManagePatient
                            <Link to="/admin/manage-patient" />
                        </MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </>
    );
};

export default Sidebar;
