---json
{
  "published": false,
  "title": "Beelzebub Challenge",
  "sell": "A nightmare-fueled adventure through the layers of encoding hell to find a secret payload!",
  "coverImage": "https://img.clock.co.uk/1280x720",
  "coverImageSquare": "https://img.clock.co.uk/720x720",
  "tags": ["encoding", "challenge"],
  "date": "2020-09-30T09:30:00.000Z"
}
---

# RAW NOTES & COMMENTS

maybe add large quote blocks titled `What? How?!` showing how this works and a little history or some further reading

# Backstory

Where I currently work, we like to challenge ourselves and eachother. One of my colleagues decided to create a very simple challenge of "who can get the secret out of this message":

```
H4sIAA3of1wCA/N1ca3wdXEs9w0BYVco7VgBZ7sA2SA1cHlXiFgIWF8FQh4kjizmCBODYIhemF3IemH6YPaV+wbm2wIAN2mpv5gAAAA=
```

If you're familiar with text encoding standards, you'll immediately be able to guess that it's likely base64 encoded data - off to a good start!


## 0. Preamble (The Surface)

During this adventure to the centre of hell I'll be posting snippets of the output with `<data removed>` - if you _really_ want to see what it looks like, follow along at home :). Not to mention, some of the payloads end up being quite large!

I **strongly** recommend trying this on your own first. It's a great puzzle! Once you've seen the solution to a level, you can't un-see it!!

## 1. Limbo

can find encoding standard by googling `"<~" "~>"`

download 	url = git@github.com:roukaour/ascii85.git

make & decode
check to see if it works first
➜ ./ascii85/ascii85 -d 1.limbo
// TODO perl
```
gem install Ascii85
```

oh look, there's some text we can read! save to a file

➜ ascii85 --decode 1.limbo > 2.lust

## 2. Lust

look at the start of the file to try and guess what it is like

-> head -n8 2.lust
```
Ί\Welcome to Dante's Inferno. You've escaped Limbo; this is Lust. Get down to the centre of hell!%PDF-1.1
%
3 0 obj
<<
/Params 1 0 R
/Filter /FlateDecode
/Type /EmbeddedFile
/Length 2 0 R
```

we can make a guess at this point with what is human readable at this point - the "welcome" comment and the string `PDF-1.1` gives a hint that it's a PDF file. Opening this with any PDF reader will yield nothing at this point however.

We can use the power of `file` to see what the magic bytes tell us.

```
➜ file 2.lust
2.lust: gzip compressed data, was "Welcome to Dante's Inferno. You've escaped Limbo; this is Lust. Get down to the centre of hell!", last modified: Thu Mar 14 21:59:58 2019, max compression, from Unix
```

ah - we've been caught out by an assumption. this data is gzipped. Let's gunzip and look again - we're anticipading a PDF as a result!

`gunzip < 2.lust`

The contents of the archive will be sent to stdout - so we can have a read and see that it was sucessful with the human readable string in there:

```
>>
stream
  BT
    /F1 18 Tf
    0 0 Td
    (You're now in Gluttony. It's a long way down to the centre; so better get cracking!) Tj
  ET
endstream
```

Save it

`gunzip < 2.lust > 3.gluttony`

## 3. Gluttony

, and have a closer look - you can even open the file in a pdf reader to see the above string.

image of pdf

Looking closer at the file in a text editor we can spot some clues to get to the next stage.

the `/Type /EmbeddedFile` tells us something is hidden within this PDF file, we just need to figure out how to extract it properly.

we can use `pdfextract` to get all the data streams from the file.

```
> pdfextract -s 3.gluttony
Extracted 2 PDF streams to '3.gluttony.dump/streams'.
```


Now we've got 2 data streams in there. We need to identify which one is our data stream (hint: we wont be able to read it!)

```
➜ file 3.gluttony.dump/streams/stream_3.dmp
3.gluttony.dump/streams/stream_3.dmp: Zip archive data, at least v2.0 to extract

➜ file 3.gluttony.dump/streams/stream_10.dmp
3.gluttony.dump/streams/stream_10.dmp: ASCII text
```

Success! We'll rename our file so we know what's what.

```
➜ mv 3.gluttony.dump/streams/stream_3.dmp 4.greed
```

## 4. Green

We know we're looking at ZIP archive data. The ASCII text was just our friendly "welcome to Gluttony" message.

Lets unzip it and see what we have.

```
➜ unzip 4.greed
Archive:  4.greed
[4.greed] Wrath password:
```

Well. Now we're stuck. Nothing in our dodgy PDF suggested a possible password!

Or did it? Looking closer at the message again - available in the `stream_10.dmp` file -

```
➜ cat 3.gluttony.dump/streams/stream_10.dmp
  BT
    /F1 18 Tf
    0 0 Td
    (You're now in Gluttony. It's a long way down to the centre; so better get cracking!) Tj
  ET%
```

What if this is a hint from the creator? If you're not from an English-speaking country, `get cracking` means to "get busy".

We can try cracking the encryption - ZIP encryption is known to be weak [citation needed].


There's two very popular tools for password cracking or zip cracking in general - john and fcrackzip.

We only really need john for the wordlist - fcrackzip will do the heavy lifting here.

```
➜ fcrackzip --use-unzip --dictionary --init-password /usr/share/john/password.lst 4.greed


PASSWORD FOUND!!!!: pw == secret
```

There it is! Super secure password.

simply unzip with the password and we're a level deeper.


```
➜ unzip 4.greed > 4.wrath
[4.greed] Wrath password: secret
```

## 4. Wrath

Now that we're here, we'll go straight to the tool that hasn't let us down yet - `file`.

```
➜ file 4.wrath
4.wrath: ASCII text
```

Helpful! At least we should be able to read it this time. Looking at the file we can see a clear header and footer, with garbage (to us) in between.

```
➜ cat 4.wrath
end

<FILE CONTENTS HIDDEN>

begin 644 Heresy
```

Unix users may immediately recognise the significance of `644` - it is an identifier for file permissions!

Time for some ducking. Searching for the keywords "end begin 644" (removing `Heresy` as it's clearly the name of the next step!) brings us gratification instantly - `uuencoding` pops up and we can see that it matches the format of our file clearly!

Checking out the Wikipedia page we see an example file:

```
begin 644 cat.txt
#0V%T
`
end
```

MAY NEED `sharutils`

Ours is almost identical - but upside down. We can just reverse the order and use `uudecode` to build the original binary.

```
➜ tac 4.wrath | uudecode --output-file 5.heresy
```

## 5. Heresy

One level closer.

Heading straight back to the favourites `file` & `cat`, we can see that we're dealing with a PNG with something embedded within it:

```
➜ file 5.heresy
5.heresy: PNG image data, 86 x 41, 4-bit colormap, non-interlaced
```

Something we recognise!

```
➜ cat 5.heresy
PNG

IHDRV)]
       PLTE֜._6
 `Q@fPhvE     4u}IDATx
         {:_,ς7kTV(=C%Ba'aqՌBY3Nlrݡ!F6F8rj#e891'֓^։urSk(H23ƹd;k-}!4K%D~27ɏQ;vw9	&=P4f5ʒ}3bXffGk-}Pdް/KAW<	5(q~am+pGs
                                                                                                                          ;dUM{ы٥߭8ߥPl>Y^:wZ˸
eɶZ.mȲwfՈm6e#&qlTj@l@4`e M+] tEXtCommentThe 7th circle of hell might make you feel deflated. This way to Violence: <data removed>
```

Interesting, it appears our next payload has been embedded into a text comment in the PNG file.

We can visually inspect the file to see how it renders - it's valid, and is a lovely little image.

screenshot of the image

Looking at the EXIF specification blah blah `tEXtComment` is valid because blah

apt install pngcheck

Using pngcheck we can get the data within that comment:

```
➜ pngcheck -q -7 5.heresy
File: 5.heresy (1779 bytes)
Comment:
    The 7th circle of hell might make you feel deflated. This way to Violence: <data removed>
```

All that is needed now is to remove the comment to retain only our next payload - easily done with `head`.

```
➜ pngcheck -q -7 5.heresy | tail --bytes +117 > 6.violence
```

## 6. Violence

Getting a bit hot down here.

Still, glad we've got `file` to help keep our cool -

```
➜ file 6.violence
6.violence: JPEG 2000 image
```

Oh, but it's a text file! It doesn't even open in GIMP!

Lets look closer at the end snippet we have here:

```
<start of data removed>Ud1f2Qyc0/XmRkShk6DHK2SAA0YozQ0mQ4IcPX1cgxQVFRnoBgA=
```

Now this is something we can work with - strings ending in `=` often indicate common base64 encoding!

It's quite easy to decode with a simple built-in:

```
➜ base64 --decode 6.violence
sq\\xpKFraud(/	DRIFFWAVEfmt dat�X+
5eשt I}�].1`ڮyFExȖa2-[ݲ~JAs˛f6     7iӥp>	#N濍X*
                              )WසO$	=nϠk:
&R㻈S'
ݧK?48U<qWy:Vq\\n-32}4 ~G]Gp;~ߙw6X꿣Cw
Treacherշ3ܽHO]rTaUgRAQH\KT
                         !O5ac@6EΕWˌJ,]/bBݹ=JOظ]rY
                                                  {j!!B0gro#aNK|VARol
.j]>'vּ&KZr$CaM?k~\Sgojs[i",Mf<a"uj>175n{$ˁ?m8;
2r[ii#Y*kg_z"T{Ocٖxۿ8gQ9R%t::M0BiaCyv.f3" (OXJ
Xtv!1+UF`9juH=HX8 0v_eMjB\<٠5VԟQ_             D-E
&C=}\%
```

We see our sin-themed keywords in there - `Fraud` and `Treachery` - with the addition of a common audio format header, `DRIFFWAVE`.

We'll save this decoded ouput and see where we can get with it.


```
➜ base64 --decode 6.violence > 6.5.violence
```

## 6.5 Violence (still)

Heading straight for `file` to figure it out -

```
➜ file 6.5.violence
6.5.violence: data
```

No help this deep. Somehow, it seems like two possible payloads have been combined - but we can't see how to get to it.

We appear to be stuck here now. Nothing is guiding us - no devils on our shoulders - no hints.

Ah, hints! The comments left might point towards something. Thinking back to the last one we found:

```
The 7th circle of hell might make you feel deflated. This way to Violence:
```

We're trying to get to level 7 from Violence - it might not seem obvious, but maybe `deflated` is our keyword here?

insert some background about the DEFLATE algorithm

We can use `gzip` to INFLATE our data, we just need to make it think it's valid:

```
➜ printf "\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x00" | cat - 6.5.violence | gzip --decompress --stdout > 6.75.violence
```

Your command might output an error - but we can see it worked!

```
➜ cat 6.75.violence
q\\xpKFraud(/	DRIFFWAVEfmt dat�X+
5eשt I}�].1`ڮyFExȖa2-[ݲ~JAs˛f6     7iӥp>	#N濍X*
                              )WසO$	=nϠk:
&R㻈S'
ݧK?48U<qWy:Vq\\n-32}4 ~G]Gp;~ߙw6X꿣Cw
Treacherշ3ܽHO]rTaUgRAQH\KT
                         !O5ac@6EΕWˌJ,]/bBݹ=JOظ]rY
                                                  {j!!B0gro#aNK|VARol
.j]>'vּ&KZr$CaM?k~\Sgojs[i",Mf<a"uj>175n{$ˁ?m8;
2r[ii#Y*kg_z"T{Ocٖxۿ8gQ9R%t::M0BiaCyv.f3" (OXJ
Xtv!1+UF`9juH=HX8 0v_eMjB\<٠5VԟQ_             D-E
                                 FDq
                                    TRAILER!!!%

➜ file 6.75.violence
6.75.violence: cpio archive
```

got a cpio archive - lets have a peek inside

```
➜ cpio -it -F 6.75.violence
Fraud
Treachery
2 blocks
```

Looks good to us. Go ahead and extract the files:

```
➜ cpio --to-stdout -i < 6.75.violence Fraud > 7.fraud
2 blocks

➜ cpio --to-stdout -i < 6.75.violence Treachery > 7.treachery
2 blocks

➜ ls -lah 7.*
-rw-rw-r-- 1 jack jack 331 Sep 22 20:39 7.fraud
-rw-rw-r-- 1 jack jack 482 Sep 22 20:39 7.treachery
```

## 7. Fraud & Treachery


Let's see what we've been given.

```
➜ file 7.treachery
7.treachery: GPG symmetrically encrypted data (AES256 cipher)

➜ file 7.fraud
7.fraud: Zstandard compressed data (v0.8+), Dictionary ID: None
```


Since Treachery is clearly an encrypted archive, we'll have to look at Fraud first - maybe it will be our passphrase?




## Meeting Satan

We did it! We've ventured through the depths of hell and gotten our magic payload. Well done if you did it on your own!

Here's a recap of everything the original file had to go through to get out our payload:

1. Base85
2. Gzipped
3. PDF data stream
4. Encrypted ZIP
5. reversed line order
6. uuencoding
7. Text EXIF comment in PNG
8. Base64
9. GPG encrypted with a key "hidden" in morse code WAV file

abomination

```
curl --silent https://gist.githubusercontent.com/cronnelly/5edf4d42a5c31abb08089efe94d232b6/raw/eb161a9ae903672e02a50fd39434d5ab80948e68/Limbo | ascii85 --decode | gunzip | tail -n +11 | head -n +5 | zlib-flate -uncompress | funzip -secret | tac | python3 -c "from codecs import decode;import sys;print(decode(sys.stdin.read().encode('UTF-8'), 'uu'))" | tail -c +1399 | head -c -45 | base64 --decode | cat <(printf "\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x00") - | gzip --decompress --stdout | cpio --to-stdout -i Treachery | gpg --batch --quiet --passphrase 0AE7462A -d -
```

crack zip

```
funzip "-$(fcrackzip --use-unzip --dictionary --init-password /usr/share/john/password.lst ./3.gluttony.dump/streams/stream_3.dmp | tail -c +29 | head -c +6)" < ./3.gluttony.dump/streams/stream_3.dmp
```

crack zip from within pipe

```
➜ cat ./3.gluttony.dump/streams/stream_3.dmp | tee /tmp/beezlebub-gluttony-zip | funzip "-$(stdbuf -o0 fcrackzip --use-unzip --dictionary --init-password /usr/share/john/password.lst /tmp/beezlebub-gluttony-zip | tail -c +29 | head -c +6)"
```

beginning to uuencoded file
```
➜ curl --silent https://gist.githubusercontent.com/cronnelly/5edf4d42a5c31abb08089efe94d232b6/raw/eb161a9ae903672e02a50fd39434d5ab80948e68/Limbo | ascii85 --decode | gunzip | tail -n +11 | head -n +5 | zlib-flate -uncompress | tee /tmp/beezlebub-gluttony-zip | funzip "-$(while [ ! -f /tmp/beezlebub-gluttony-zip ]; do sleep 1; done; sleep 1; fcrackzip --use-unzip --dictionary --init-password /usr/share/john/password.lst /tmp/beezlebub-gluttony-zip | tail -c +29 | head -c +6)"
```

decode morse requires `pip3 install morse3`

```
➜ cat Fraud | zstd -d | tail -c +41 | awk 'BEGIN {RS="\x80\x81{3}\x80{500,}"; FS="\x80\x81{3}\x80{200,}.*?"} { if(NR != 1) printf " "; for(i = 1; i <= NF; i++) { if (length($i) > 1000) { printf "-" } else { printf "." } } }' | python3 -c 'from morse3 import Morse; import sys; print(Morse(sys.stdin.read()[:-1]).morseToString().upper(), end="")'
```

whole thing requires `moreutils` for `pee`


```
curl --silent https://gist.githubusercontent.com/cronnelly/5edf4d42a5c31abb08089efe94d232b6/raw/eb161a9ae903672e02a50fd39434d5ab80948e68/Limbo \
  | ascii85 --decode \
  | gunzip \
  | tail -n +11 \
  | head -n +5 \
  | zlib-flate -uncompress \
  | tee /tmp/beezlebub-gluttony-zip \
  | funzip "-$(while [ ! -f /tmp/beezlebub-gluttony-zip ]; do sleep 1; done; sleep 2; fcrackzip --use-unzip --dictionary --init-password /usr/share/john/password.lst /tmp/beezlebub-gluttony-zip | tail -c +29 | head -c +6)" \
  | tac \
  | python3 -c "from codecs import decode;import sys;print(decode(sys.stdin.read().encode('UTF-8'), 'uu'))" \
  | tail -c +1399 \
  | head -c -45 \
  | base64 --decode \
  | cat <(printf "\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x00") - \
  | gzip --decompress --stdout \
  | cpio --to-stdout -i Treachery \
  | gpg --batch --quiet --passphrase 0AE7462A -d -
```
