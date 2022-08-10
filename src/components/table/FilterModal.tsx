import { FormInput } from 'components/form';
import { useModal } from 'pages/uikit/hooks';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { ExtendColumn, FieldType } from './Table';

type FilterModalProps = {
    schemas: ReadonlyArray<ExtendColumn>;
    onFilter: (data: any) => void;
};
const FilterModal = ({ schemas, onFilter }: FilterModalProps) => {
    const { isOpen, toggleModal } = useModal();
    const methods = useForm();
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    const submit = handleSubmit((data) => {
        toggleModal();
        onFilter(data);
    });
    return (
        <>
            <Button variant="outline-primary" size="sm" onClick={toggleModal}>
                Filter
            </Button>
            <Modal show={isOpen} onHide={toggleModal} dialogClassName="modal-right">
                <Modal.Header onHide={toggleModal} closeButton>
                    <h5 className="modal-title">Filters</h5>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit}>
                        {schemas
                            .filter((field) => field.filterOptions)
                            .map((field) => {
                                const filterOptions = field.filterOptions;
                                const formInputProps = {
                                    label: filterOptions?.label,
                                    type: filterOptions?.type,
                                    key: field.accessor && field.accessor.toString(),
                                    name: (field.accessor && field.accessor.toString()) || '',
                                    containerClass: 'mb-3',
                                };
                                switch (filterOptions?.type) {
                                    case FieldType.Select:
                                        return (
                                            <div key={field.accessor && field.accessor.toString()}>
                                                <Form.Label>{filterOptions?.label}</Form.Label>
													<Controller
														control={control}
														name={formInputProps.name}
														render={({ field: { onChange, onBlur, value, ref } }) => (
															<Select
																ref={ref}
																isMulti={filterOptions?.isMultiple}
																placeholder={`Select ${filterOptions?.label}`}
																options={filterOptions?.options}
																className="react-select"
																classNamePrefix="react-select"
																value={filterOptions.options?.find(c => c.value === value)?.value}
																onChange={val => onChange(val?.value)}
															></Select>
														)}
													/>
                                            </div>
                                        );
                                    default:
                                        return (
                                            <FormInput
                                                {...formInputProps}
                                                register={register}
                                                errors={errors}
                                                control={control}
                                            />
                                        );
                                }
                            })}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={submit}>
                        Reset
                    </Button>{' '}
                    <Button variant="primary" onClick={submit}>
                        Apply filter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export { FilterModal };
