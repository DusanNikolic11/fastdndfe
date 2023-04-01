import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { TbChevronDown } from "react-icons/tb";

interface ISelectboxProps<TValue> {
  options: TValue[];
  selected: TValue;
  onChange: (value: TValue) => void;
}

const Selectbox = <TValue extends { label: string }>({
  options,
  selected,
  onChange,
}: ISelectboxProps<TValue>) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative flex-1">
        <Listbox.Button className="relative w-full cursor-default  bg-white p-2 text-left text-xl">
          <span className="block truncate">{selected.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <TbChevronDown className="h-15 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 text-xl ${
                    active ? "bg-beige-light text-brown" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brown">
                        <AiOutlineCheck className="h-5 w-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Selectbox;
