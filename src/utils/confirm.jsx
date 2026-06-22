import { toast } from "react-toastify";

export const confirmToast = (message) => {
  return new Promise((resolve) => {
    toast(
      ({ closeToast }) => (
        <div style={{ textAlign: "center", fontSize: "14px" }}>
          <p>{message}</p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <button
              className="btn_toast toast_yes"
              onClick={() => {
                resolve(true);
                closeToast();
              }}
            >
              Yes
            </button>

            <button
              className="btn_toast toast_no"
              onClick={() => {
                resolve(false);
                closeToast();
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  });
};