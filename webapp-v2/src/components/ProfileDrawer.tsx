import { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  DrawerFooter,
} from "@chakra-ui/react";
import { IoCheckmark, IoCloudUploadOutline } from "react-icons/io5";

interface ProfileDraweProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer = ({ isOpen, onClose }: ProfileDraweProps) => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      // restart the state of button once file changes
      setIsUploaded(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Restart the hooks
    setIsUploaded(false);
    setProfilePicture(null);
  };

  const handleUpload = () => {
    // file upload logic
    if (profilePicture) {
      // axios API to upload the file
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      // Upload the file
      //
      // Confirm upload only if the upload success
      setIsUploaded(true);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Profile Settings</DrawerHeader>

        <DrawerBody>
          <Stack spacing={4}>
            <FormControl>
              <Box mt={4}>
                <FormLabel htmlFor="profile-pic-input">
                  Change Profile Picture
                </FormLabel>
                <Input
                  id="profile-pic-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  size="xxl"
                  borderRadius={6}
                  borderWidth={2}
                  p={1}
                />
              </Box>
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button
            leftIcon={isUploaded ? <IoCheckmark /> : <IoCloudUploadOutline />}
            onClick={handleUpload}
            size="md"
          >
            {isUploaded ? "Uploaded" : "Upload"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
