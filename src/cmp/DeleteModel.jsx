export function DeleteModal({ onHandleDelete, title = 'Delete this item?', noBtn = 'Cancel', yesBtn = 'Delete' }) {
  return (
    <section>
      <div id="myModal" className="delete-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h1>{title}</h1>
          </div>
          <div className="modal-body">
            <div className="btn-cancel" onClick={() => onHandleDelete(false)}>
              {noBtn}
            </div>
            <div className="btn-delete" onClick={() => onHandleDelete(true)}>
              {yesBtn}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
