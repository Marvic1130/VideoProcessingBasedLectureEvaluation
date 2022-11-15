import argparse, os, pathlib, sys
import tensorflow as tf
from google.protobuf import text_format
from tensorflow.python.platform import gfile

def convert(path):
    def file_path(string):
        if os.path.isfile(string):
            return string
        else:
            raise FileNotFoundError(string)

    file_path(path)
    in_dir = os.path.dirname(path)
    in_name, in_ext = os.path.splitext(os.path.basename(path))
    in_ext = in_ext.lower()

    # Verify it is a valid extention
    if in_ext == ".pb":
        to_pb = False
        out_filename = os.path.join(in_dir, in_name + ".pbtxt")
    elif in_ext == ".pbtxt":
        to_pb = True
        out_filename = os.path.join(in_dir, in_name + ".pb")
    else:
        raise argparse.ArgumentTypeError("File must be either a .pb or .pbtxt file")

    # Verify that out file doesn't already exist
    if os.path.exists(out_filename):
        if os.path.isfile(out_filename):
            raise FileExistsError("Output file already exists: '{}'".format(out_filename))


    def pbtxt_to_graphdef(filename):
        print("\n[CONVERT] Converting from .pbtxt to .pb: '{}'\n".format(filename))
        with open(filename, 'r') as f:
            graph_def = tf.GraphDef()
            file_content = f.read()
            text_format.Merge(file_content, graph_def)
            tf.import_graph_def(graph_def, name='')
            in_dir = os.path.dirname(filename)
            out_filename = os.path.splitext(os.path.basename(filename))[0] + ".pb"
            tf.train.write_graph(graph_def, in_dir, out_filename, as_text=False)
        print("\n[CONVERT] Wrote file to: '{}'\n".format(os.path.join(in_dir, out_filename)))


    def graphdef_to_pbtxt(filename):
        print("\n[CONVERT] Converting from .pb to .pbtxt: '{}'\n".format(filename))
        with gfile.FastGFile(filename, 'rb') as f:
            graph_def = tf.GraphDef()
            graph_def.ParseFromString(f.read())
            tf.import_graph_def(graph_def, name='')
            in_dir = os.path.dirname(filename)
            out_filename = os.path.splitext(os.path.basename(filename))[0] + ".pbtxt"
            tf.train.write_graph(graph_def, in_dir, out_filename, as_text=True)
        print("\n[CONVERT] Wrote file to: '{}'\n".format(os.path.join(in_dir, out_filename)))


    if to_pb:
        pbtxt_to_graphdef(path)
    else:
        graphdef_to_pbtxt(path)
