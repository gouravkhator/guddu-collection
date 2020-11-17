import React from 'react';

import { Link } from 'react-router-dom';

import './item-image.css';

// function VerticallyCenteredModal(props) {
//     return (
//         <Modal
//             {...props}
//             size="md"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Modal heading
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <h4>Centered Modal</h4>
//                 <p>
//                     Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//                     dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//                     consectetur ac, vestibulum at eros.
//                 </p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={props.onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

export default function ItemImage({ imgSrc, tags }) {
    // const [modalShow, setModalShow] = useState(false);

    return (
        <>
            {/* set onClick={() => setModalShow(true)} */}
            <div className="item-card">
                <img loading="lazy" src={imgSrc} alt={tags}
                    width="200" height="250" />

                <ul className="item-tags-list">
                    {tags && tags.split(',').map(tag => (
                        <li key={tag}>
                            <Link to={'/search/' + tag} className="tag">
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <VerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            /> */}
        </>
    )
}
