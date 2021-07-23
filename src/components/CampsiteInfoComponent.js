import Directory from "./DirectoryComponent";

class CampsiteInfo extends Directory {
    constructor(props) {
    }
    render() {
        const campsite = this.state.selectedCampsite;
        if (campsite) {
            return (
                <div className='row'>

                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
        };
    }


export default CampsiteInfo;