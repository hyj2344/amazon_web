import { useNavigate } from "react-router-dom";
import "./style/ReturnPage.css"
export default function ReturnPage() {
    const navigate = useNavigate();
    const handleButton = () => {
        alert("Successfuly submit your return");
        navigate("/orders")
    }
    return (
        <div id="ReturnPage">
            <form id="ReturnPageForm">
                <div id="ReturnPageTitle">
                    <span id="ReturnPageTitle-1">
                        Please select your return reason
                    </span>

                </div>
                <div class="ReturnPageReason">
                    <input type="radio" id="huey" name="drone" value="huey" />
                    <label for="huey" class="ReturnPageReasonLabel">Arrived late</label>
                </div>

                <div class="ReturnPageReason">
                    <input type="radio" id="dewey" name="drone" value="dewey" />
                    <label for="dewey" class="ReturnPageReasonLabel">No longer needed</label>
                </div>

                <div class="ReturnPageReason">
                    <input type="radio" id="louie" name="drone" value="louie" />
                    <label for="louie" class="ReturnPageReasonLabel">Poor Quality</label>
                </div>
                <div class="ReturnPageSubmit">
                    <button type="button" id="submitButton" onClick={() => handleButton()}>Submit</button>
                </div>
            </form>

        </div>

    )
}
