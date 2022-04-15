const UsePrice = ({ price }: { price: number }) => {
    return <>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)}</>
}

export default UsePrice
