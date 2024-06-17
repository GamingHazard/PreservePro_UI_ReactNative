import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ImagePickerComponent = ({
  aspectRatio,
  quality,
  onImageSelected,
  btnSyl,
  ImgContainer,
  imgStyl,
}) => {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(
        status === "granted" && cameraStatus.status === "granted"
      );
    })();
  }, []);

  const pickImage = async () => {
    if (hasPermission === false) {
      Alert.alert(
        "Permission denied",
        "You need to grant media library permissions to use this feature."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspectRatio || [4, 3], // Default aspect ratio
      quality: quality || 1, // Default quality
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      if (onImageSelected) {
        onImageSelected(result.assets[0].uri);
      }
    }
  };

  const takePhoto = async () => {
    if (hasPermission === false) {
      Alert.alert(
        "Permission denied",
        "You need to grant camera permissions to use this feature."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: aspectRatio || [4, 3], // Default aspect ratio
      quality: quality || 1, // Default quality
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      if (onImageSelected) {
        onImageSelected(result.assets[0].uri);
      }
    }
  };

  return (
    <View>
      <View style={[styles.container, ImgContainer]}>
        {image && (
          <Image source={{ uri: image }} style={[styles.image, imgStyl]} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage} style={[styles.addBtn, btnSyl]}>
          <MaterialCommunityIcons
            name="image"
            size={30}
            color="white"
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={[styles.addBtn, btnSyl]}>
          <MaterialCommunityIcons
            name="camera"
            size={30}
            color="white"
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    top: 20,
    marginBottom: 20,
  },

  addBtn: {
    backgroundColor: "#65000B",
    height: 60,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 10,
  },
});

export default ImagePickerComponent;
