import React, {useState} from 'react';

function NewStockForm(props) {

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [tickSize, setTickSize] = useState('');

    const submitForm = () => {
        if (name !== '' && value !== '' && tickSize!=='') {
            props.addTodo(name, value, tickSize);
            setName('');
            setValue('');
            setTickSize('');
        }
    }

    return (
        <div className='mt-5'>
            <form>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input 
                        type='text' 
                        className='form-control' 
                        required
                        onChange={e => setName(e.target.value)}
                        value={name}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Value</label>
                    <textarea 
                        type='number'
                        className='form-control' 
                        required
                        onChange={e => setValue(e.target.value)}
                        value={value}
                    ></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Tick Size</label>
                    <textarea 
                        type='number'
                        className='form-control' 
                        required
                        onChange={e => setTickSize(e.target.value)}
                        value={tickSize}
                    ></textarea>
                </div>
                <button 
                    type='button' 
                    className='btn btn-primary mt-3' 
                    onClick={submitForm}
                >
                    Add Stock
                </button>
            </form>
        </div>
    )
}


export default NewStockForm