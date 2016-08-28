# Chessboard

A (very) simple PGN viewer in JavaScript

*ATTENTION: I'm not a JS developer. I hacked this together only for my purporse. So, pull request, suggestions and other kinds of feedback are VERY, VERY welcome!!!*

## How to use

Include `chessboard.js` and `chess.js`(from [chess.js](https://github.com/jhlywa/chess.js)) in your HMTL.

Add  `div`s with class `pgn`, that contains a PGN string.

There is some configuration available with `data`-attributes at the div:

Example with default values
```html
<div
    class="pgn"
    data-label-next="next"
    data-label-back="back"
    data-label-reset="reset"
    data-ply=""
    data-headers="White,Black,Date,Event,Result"
    data-show-moves="true"
    data-show-buttons="true"
    data-show-header="true"
>[pgn]</div>
```

`data-label-next`: text for the "next" button

`data-label-back`: text for the "back" button

`data-label-reset`: tex for the "reset" button

`data-ply`: halfmove to display at first rendering

`data-headers`: List of headers, that should be show. Notice, that they start wi a capital letter, and you only can print out headers, that are given in the pgn string.

`data-show-moves`: Set this to `"false"` to hide moves.

`data-show-buttons`: Set this to `"false"` to hide buttons

`data-show-header`: Set this to `"false"` to hide headers

## Example

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <link rel="stylesheet" href="chessboard.css">
    <title>chessboard</title>
</head>
<body>

<div class="pgn">
[Event "Simultaneous"]
[Site "Budapest HUN"]
[Date "1934.??.??"]
[EventDate "?"]
[Round "?"]
[Result "1-0"]
[White "Esteban Canal"]
[Black "NN"]
[ECO "B01"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "27"]

1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 c6 5.Nf3 Bg4 6.Bf4 e6 7.h3 
Bxf3 8.Qxf3 Bb4 9.Be2 Nd7 10.a3 O-O-O 11.axb4 Qxa1+ 12.Kd2 
Qxh1 13.Qxc6+ bxc6 14.Ba6# 1-0
</div>
    <script src="chess.min.js" type="text/javascript"></script>
    <script src="chessboard.js" type="text/javascript"></script>
</body>
</html>
```

## Demo

Check [demo.html](demo.html) or have a look at [my site](http://vogelschwarz.de/en/chess)

