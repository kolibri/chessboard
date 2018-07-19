# Chessboard

## A javascript/react chessboard for displaying pgn strings

### Usage:

```html
    <!-- include assets -->
    <link  href="dist/chessboard.css" rel="stylesheet">
    <script src="dist/chessboard.js" type="text/javascript"></script>
</head>
<body>
    <h2>Peruvian Immortal with default options</h2>
    <!-- place a div with class `pgn` and pgn string as content -->
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
</body>
</html>
```
