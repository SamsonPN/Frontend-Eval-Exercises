const displayModal = (e) => {
    const modal = document.getElementById('modal');
    const accept_btn = document.getElementById('accept-offer-btn');

    modal.style.display = "flex";
    accept_btn.dataset.offer = e.target.dataset.offer;
}

const dismissModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

const acceptOffer = (e) => {
    dismissModal();

    const { offer } = e.target.dataset;
    const offer_btn = [...document.getElementsByClassName('offer-button')][offer];
    const accept_msg = [...document.getElementsByClassName('offer-accepted-msg')][offer];
    
    offer_btn.style.display = "none";
    accept_msg.style.display = "block";
}

const main = () => {
    const offer_btns = [...document.getElementsByClassName('offer-button')];
    const accept_btn = document.getElementById('accept-offer-btn');
    const modal = document.getElementById('modal');
    const modal_menu = document.getElementById('modal-menu');
    const exit_btn = document.getElementById('exit-modal-btn');
    
    offer_btns.forEach(btn => btn.addEventListener('click', displayModal));

    modal.addEventListener('click', dismissModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dismissModal();
        }
    })

    accept_btn.addEventListener('click', acceptOffer);

    exit_btn.addEventListener('click', dismissModal);

    modal_menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

main();