package com.example.demo.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entitydto.FileModel;



@Service
public class FileService {
	
	
	public FileModel uploadvideo(String path, MultipartFile file) throws IOException {

		FileModel fileModel = new FileModel();
		String fileName = file.getOriginalFilename();

		String randomId = UUID.randomUUID().toString();
		String finaleName = randomId.concat(fileName).substring(fileName.indexOf("."));

		String filepath = path + File.separator + finaleName;

		File f = new File(path);
		if (f.exists()) {
			f.mkdir();
		}
		Files.copy(file.getInputStream(), Paths.get(filepath));
		fileModel.setVideoFileName(finaleName);
		return fileModel;
	}


	public InputStream getVideoFile(String path, String fileName, long id) throws FileNotFoundException {

		String fullpath = path + File.separator + fileName;
		InputStream inputStream = new FileInputStream(fullpath);
		return inputStream ;
	}
}
