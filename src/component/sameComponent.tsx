import { Modal, TextInput, Button, Stack, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { User } from "../api/api";
import { useEffect } from "react";

interface UserModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (user: Omit<User, "id">) => void;
  mode: "add" | "edit";
  initialData?: User;
}

type UserFormValues = Omit<User, "id">;

export default function SameComponent({
  opened,
  onClose,
  onSubmit,
  mode,
  initialData,
}: UserModalProps) {
  const form = useForm<UserFormValues>({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "", catchPhrase: "", bs: "" },
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
    },

    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.name.trim()) errors["name"] = "Name is required";
      if (!values.username.trim()) errors["username"] = "Username is required";
      if (!/^\S+@\S+\.\S+$/.test(values.email))
        errors["email"] = "Invalid email address";
      if (!values.phone.trim()) errors["phone"] = "Phone is required";
      if (!values.website.trim()) errors["website"] = "Website is required";

      if (!values.company.name.trim())
        errors["company.name"] = "Company name is required";
      if (!values.company.catchPhrase.trim())
        errors["company.catchPhrase"] = "Catch phrase is required";
      if (!values.company.bs.trim())
        errors["company.bs"] = "Business slogan (bs) is required";

      if (!values.address.street.trim())
        errors["address.street"] = "Street is required";
      if (!values.address.suite.trim())
        errors["address.suite"] = "Suite is required";
      if (!values.address.city.trim())
        errors["address.city"] = "City is required";
      if (!values.address.zipcode.trim())
        errors["address.zipcode"] = "Zipcode is required";

      if (!values.address.geo.lat.trim())
        errors["address.geo.lat"] = "Latitude is required";
      if (!values.address.geo.lng.trim())
        errors["address.geo.lng"] = "Longitude is required";

      return errors;
    },
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.setValues(initialData);
    } else {
      form.reset();
    }
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={mode === "add" ? "Add User" : "Edit User"}
      styles={{
        title: {
          color: "#ae3ec9",
          fontWeight: 700,
          textAlign: "center",
          width: "100%",
          fontSize: "24px",
        },
        header: {
          justifyContent: "center",
        },
      }}
      size="lg"
      radius="lg"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
          onClose();
        })}
      >
        <Stack>
          <TextInput label="Name" {...form.getInputProps("name")} />
          <TextInput label="Username" {...form.getInputProps("username")} />
          <TextInput label="Email" {...form.getInputProps("email")} />
          <TextInput label="Phone" {...form.getInputProps("phone")} />
          <TextInput label="Website" {...form.getInputProps("website")} />
          <TextInput
            label="Company Name"
            {...form.getInputProps("company.name")}
          />
          <TextInput
            label="Catch Phrase"
            {...form.getInputProps("company.catchPhrase")}
          />
          <TextInput label="BS" {...form.getInputProps("company.bs")} />
          <Text fw={600}>Address:</Text>
          <TextInput label="Street" {...form.getInputProps("address.street")} />
          <TextInput label="Suite" {...form.getInputProps("address.suite")} />
          <TextInput label="City" {...form.getInputProps("address.city")} />
          <TextInput
            label="Zipcode"
            {...form.getInputProps("address.zipcode")}
          />
          <TextInput
            label="Latitude"
            {...form.getInputProps("address.geo.lat")}
          />
          <TextInput
            label="Longitude"
            {...form.getInputProps("address.geo.lng")}
          />
          <Group justify="center" mt="md">
            <Button type="submit" color="grape" w={"100%"}>
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
