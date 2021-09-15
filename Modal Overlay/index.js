const displayModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = "flex";
}

const dismissModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

const acceptOffer = () => {
    dismissModal();

    const offer_btn = document.getElementById('offer-button');
    const accept_msg = document.getElementById('offer-accepted-msg');
    
    offer_btn.style.display = "none";
    accept_msg.style.display = "block";
}

const main = () => {
    const offer_btn = document.getElementById('offer-button');
    const modal = document.getElementById('modal');
    const accept_btn = document.getElementById('accept-offer-btn');
    const exit_btn = document.getElementById('exit-modal-btn');
    const modal_menu = document.getElementById('modal-menu');

    offer_btn.addEventListener('click', displayModal)

    modal.addEventListener('click', dismissModal);

    accept_btn.addEventListener('click', acceptOffer);

    exit_btn.addEventListener('click', dismissModal);

    modal_menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

main();