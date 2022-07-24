import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

interface IBasicDialog {
    title: string
    open: boolean
    btnCancelText?: string
    btnOkText?: string
    handleCancel?(): void
    handleOk(): void
    handleClose(): void
    children?: Node
}

/**
 * @visibleName BasicDialog
 */
export const BasicDialog = ({
    title,
    open,
    handleOk,
    children,
    handleClose,
    btnCancelText = 'Annuler',
    btnOkText = 'Confirmer',
    handleCancel = () => null,
    ...props
}: IBasicDialog) => {
    const localHandleCancel = () => {
        handleCancel()
        handleClose()
    }

    const localHandleOk = () => {
        handleOk()
        handleClose()
    }
    return (
        <Dialog open={open} onClose={handleClose} {...props}>
            <DialogTitle>{title}</DialogTitle>
            {children && <DialogContent>{children}</DialogContent>}
            <DialogActions sx={{ px: 6 }}>
                <Button variant="contained" onClick={localHandleCancel} sx={{ mr: 3 }}>
                    {btnCancelText}
                </Button>
                <Button onClick={localHandleOk}>{btnOkText}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default BasicDialog
