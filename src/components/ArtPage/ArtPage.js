import ArtImages from '../../site_data/art_images.json'
import './ArtPage.css'

const ArtPage = ({ folder }) => {
    const pageFolder = '/img/art_images/'
    const files = ArtImages[folder];
    console.log('images', files);
    return (
        <>
            <h1 style={{paddingLeft:"10vw"}}>{folder}</h1>
            <div class="container blog-container">
                {
                    files.map((file, i) => {
                        return (
                            <>
                                <div class="art-div">
                                    <img key={i} className="art-piece small-art" title={file} src={pageFolder + folder + '/' + file} alt="tylor-art" />
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
};

export default ArtPage;