
import { toast } from "react-toastify";

export const showToastMessage = (toastDetails) => {
    console.log(toastDetails)

    if (toastDetails.type === "success") {
        toast.success(toastDetails.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
        });
    } else {
        toast.error(toastDetails.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
        });
    }
};