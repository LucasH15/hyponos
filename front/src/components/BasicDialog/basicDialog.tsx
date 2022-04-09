import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

interface IBasicDialog {
    title: string
    open: boolean
    btnCancelText?: string
    btnOkText?: string
    handleCancel?(): any
    handleOk(): any
    handleClose(): void
    children?: Node
}

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
            <DialogActions>
                <Button onClick={localHandleCancel}>{btnCancelText}</Button>
                <Button onClick={localHandleOk}>{btnOkText}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default BasicDialog
