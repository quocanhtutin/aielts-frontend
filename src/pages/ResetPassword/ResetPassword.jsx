import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const { token } = useParams();
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(
            `${url}/api/user/reset-password/${token}`,
            {
                password
            }
        );

        if (res.data.success) {
            toast.success("Đổi mật khẩu thành công");
            navigate('/');
        }
        else {
            toast.error(res.data.message);
        }
    };

    return (
        <div className='login-popup'>
            <form
            className="login-popup-container"
             onSubmit={handleSubmit}>
                <div className="login-popup-title">
                    <h2>Đặt lại mật khẩu</h2>
                </div>
                
                <div className="login-popup-inputs">
                    <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <button type="submit">
                    Đổi mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;